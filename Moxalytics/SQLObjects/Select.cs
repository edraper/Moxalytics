using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moxtest
{
    public class Select
    {          
        public bool distinct = false;
        public string top = null;
        public List<Fields> fields = null;

        public string constructSelect()
        {    
            //initiates the string
            string theSelect = string.Empty;

            //check for and Adds any top values (TOP 5)
            if (top != null)
                theSelect += " TOP " + top;
            //checks for and Adds DISTINCT to the query
            if(distinct == true)
                theSelect += " DISTINCT";   

            //incraments through each field, contructing the correct text for each select field.
            for(int i = 0; i < fields.Count; i++)
            {
                if(i == 0)                
                    theSelect += " " + fields[i].constuctFields();                
                else 
                    theSelect += ", " + fields[i].constuctFields();
            }

            return theSelect;
        }
    
    }
}
