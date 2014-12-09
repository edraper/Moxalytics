using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moxalytics
{
    public class Column
    {
        public string databaseName = null;
        public string tableName = null;
        public string columns = null;
        public string AS = null;               

        public string getColumnText()
        {
            if(AS == string.Empty)
                AS = tableName;

            return " [" + databaseName + "].[" + tableName + "].[" + columns + "]";
        }

        public string getJoinText()
        {
            if (AS == string.Empty)
                AS = tableName;
           
            return " [" + databaseName + "].[dbo].[" + tableName + "] " + AS;
        }

        public string getJoinColumnText()
        {
            return " " + AS + "."+columns;
        }

       
        public string getAS()
        {
            if (AS != null)
                return " AS" + AS;
            else
                return string.Empty;
        }

        public string getWhereString()
        {
            return " " + databaseName + "." + tableName + "." + columns;
            return string.Empty;
        }
        

    
    }
}