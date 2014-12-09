using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moxalytics
{
    public class Where
    {
        public Column columnDefault = null;
        public Column columnCompair = null;
        public Between between = null;
        public string bLogic = null; 
        public string operand = "=";
        public string like = null;
        public string value = null;
        public string whereString = null;

      
        public string constructWhere()
        {   
            if (between != null)
            {    
               whereString = " " + columnDefault.getColumnText() + " BETWEEN '" + between.start + "' AND '" + between.end + "'";             
            }
            else if(like != null)
            {
                whereString = " " + columnDefault + " LIKE '%" + value + "%'";             
            }       
            else if(columnCompair != null)
            {
                
                whereString = " " + columnDefault.getColumnText() + " " + operand + " " + columnDefault.getColumnText() + " ";
            }
            else if(value != null)
            {
                whereString = " " + columnDefault.getColumnText() + " " + operand + " " + value + "'";
            }

            return string.Empty;
        }
    }
}
