using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moxalytics.SQLObjects
{
    public class Where
    {
        public int index;
        public string Logic = "AND";
        public string Column = string.Empty;
        public string Table = string.Empty;
        public string Database = string.Empty;
        public string Server = string.Empty;
        public object Value = string.Empty;
        public string WhereString = string.Empty;

        public string generateWHERE()
        {
            if (index == 0)
            { 
               WhereString = " WHERE " + Table + "." + Column + " = '" + Value + "'";
            }
               
            else
            {
                if (Logic == "AND")
                {
                   WhereString = " AND [" + Table + "].[" + Column +"] = '" + Value +"'";
                }
                if (Logic == "OR")
                {
                    WhereString = " OR [" + Table + "].[" + Column + "] = '" + Value + "'";
                }
            }

            return WhereString;
        }
    }
}