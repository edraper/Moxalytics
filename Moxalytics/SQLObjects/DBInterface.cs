using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Moxalytics
{
    public class DBInterface    
    {
        public static string SQL = string.Empty;
      
        public static void parseJSON(string json)
        {
            try
            {
                Query q = JsonConvert.DeserializeObject<Query>(json);            
            SQL = q.constructSQL();
            
            }catch
            {
                //Nothing yet
            }
            
        }

        public static string runQuery(string Server)
        {
            try
            {

            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection("Data Source="+Server+";Initial Catalog=Projects;Integrated Security=true"))
            {
                using (SqlCommand cmd = new SqlCommand(SQL, con))
                {
                    con.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    
                    System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                   
                    List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                    Dictionary<string, object> row;
                   
                    foreach (DataRow dr in dt.Rows)
                    {
                        row = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                        rows.Add(row);
                    }
                  return serializer.Serialize(rows);
                    
                }
            }

            }
            catch
            {
                //nothing yet
            }
            return null;
           
        }
    }
}