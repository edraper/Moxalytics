using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace Moxalytics.Models
{
    public class SQLCommand
    {
        public List<string> dbList = new List<string>();
        public List<string> tableList = new List<string>();
        public List<string> ColumnList = new List<string>();
        
        public string[] dbArray;
        public object dbQueriedObject;
        public DataTable dbTable;
        public string dbValue;        
        public string dbConnectionString;
        public string dbBool;
        
        //sql structures
        private string select = string.Empty;
        private string from = string.Empty;
        private string distinct = string.Empty;
        private string where = string.Empty;
        private string join = string.Empty;
        private string orderBy = string.Empty;
        private string groupBy = string.Empty;
        private string top = string.Empty;
        private string like = string.Empty;
        private string between = string.Empty;
        private string average = string.Empty;
        private string count = string.Empty;
        private string first = string.Empty;
        private string last = string.Empty;
        private string max = string.Empty;
        private string min = string.Empty;
        private string having = string.Empty;
        private string round = string.Empty;
        
        //Constructors
        public SQLCommand()
        {           
         
        }

        public void execute()
        {
            SqlDataReader reader = null;

            string sqlString = "SELECT " + distinct + " " + top + " " + select + " " + round + " " + max + " " + min + " " + average + " " + count + " " + last + " " + first + " " +
                                from + " " + join + " " + where + " " + having + " " + like + " " + between + " " + groupBy + " " + orderBy + ";";
                               
            using (SqlConnection connection = new SqlConnection())
            {
                SqlCommand command = new SqlCommand(sqlString, connection);
                try
                {
                    connection.Open();
                    reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        string a = reader[0].ToString();
                    }
                }
                catch (Exception ex)
                {
                   // System.Windows.Forms.MessageBox.Show("Unable to retrieve Database from Server \n" + ex);
                }
                finally
                {
                    reader.Close();
                }
            }
            
        }

        public List<string> getColumnsInTable(string server, string database, string table)
        {
            SqlDataReader readerColumn = null;
            string queryString = string.Empty;
            string connectionString = string.Empty;


            //Query Setup
            queryString = "Select * From INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + table + "'";

            connectionString = "Data Source= " + server + ";Initial Catalog=" + database + ";Integrated Security=True;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                try
                {
                    connection.Open();
                    readerColumn = command.ExecuteReader();
                    while (readerColumn.Read())
                    {
                        ColumnList.Add(readerColumn[3].ToString());
                    }
                }
                catch (Exception ex)
                {
                    //      System.Windows.Forms.MessageBox.Show("Unable to retrieve Database from Server \n" + queryString + "\n" + ex);
                }
                finally
                {
                    readerColumn.Close();
                }

                return ColumnList;
            }
        }

        /// <summary>
        /// GetTablesInDatabase: Returns a listof 
        /// </summary>
        /// <param name="server"></param>
        /// <param name="database"></param>
        public List<string> getTablesInDatabase(string server, string database)
        {
            SqlDataReader readerDB = null;
            string queryString = string.Empty;
            string connectionString = string.Empty;

            //Query Setup
            queryString = "Select * From sys.Tables";
            connectionString = "Data Source= " + server + ";Initial Catalog=" + database + ";Integrated Security=True;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                try
                {
                    connection.Open();
                    readerDB = command.ExecuteReader();
                    while (readerDB.Read())
                    {
                         tableList.Add(readerDB[0].ToString());
                    }

                }
                catch (Exception ex)
                {
                    //     System.Windows.Forms.MessageBox.Show("Unable to retrieve Database from Server \n" + ex);
                }
                finally
                {
                    readerDB.Close();
                }
                return tableList;
            }
        }
   
       /// <summary>
       /// getDBsOnServer, retruns a list of Databases on the parameter pass in
       /// </summary>
       /// <param name="Server">Pass in the name of the server: for the one that works pass in "esp\xray"</param>
        public List<string> getDBsOnServer(string Server)
        {
            //Variables           
            SqlDataReader reader = null; ;
            string queryString = string.Empty;
            string connectionString = string.Empty;

            //Query Setup
            queryString = "Select * From sys.databases";
            connectionString = "Data Source= " + Server + "; Integrated Security=True;";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                try
                {
                    connection.Open();
                    reader = command.ExecuteReader(); 
                    
                    while (reader.Read())
                    {
                        dbList.Add(reader[0].ToString());
                    }
                }
                catch(Exception ex)
                {
                    //System.Windows.Forms.MessageBox.Show("Unable to retrieve Database from Server \n" + ex);
                }
                finally
                {
                    reader.Close();                    
                }                  
            }
            return dbList;
        }


        public void update()
        {

        }
    }
}