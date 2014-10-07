using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moxalytics.SQLObjects
{
    public class Select
    {
        public int index;
        public string ColumnName = string.Empty;
        public string Tablename = string.Empty;
        public string DatabaseName = string.Empty;
        public string ServerName = string.Empty;

        public string genSelect()
        {
            if (index == 0)
                return " [" + Tablename + "].[" + ColumnName + "]";
            else
                return ", [" + Tablename + "].[" + ColumnName + "]"; 
        }
    }
}