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

            Query q = JsonConvert.DeserializeObject<Query>(json);
            
            Console.WriteLine(q.constructSQL());
            Console.ReadLine();
        }

        public static DataTable runQuery(string connectionString)
        {
            DataTable dt;

            if(SQL == string.Empty) 
            {
                return null;
            }
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand command = new SqlCommand(SQL, connection);
                    command.Connection.Open();
                    connection.Open();
                    dt = new DataTable();
                    dt.Load(command.ExecuteReader());
                    connection.Close();
                }

            }
            catch
            {
                return null;
            }

            return dt;
        }
    }
}