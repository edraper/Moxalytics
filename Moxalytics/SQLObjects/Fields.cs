using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moxtest
{
    public class Fields
    {
        public Column column = null;
        public Column max = null;
        public Column min = null;
        public Column average = null;
        public Column count = null;
        public Column first = null;
        public Column last = null;
        public Column sum = null;

        public string constuctFields()
        {
            string theFeild = string.Empty;
            
            if (column != null)
            {
                theFeild = column.getColumnText() + column.getAS();
            }
            else if (max != null)
            {
                theFeild = " MIN (" + max.getColumnText() + ")" + max.getAS();
            }
            else if (min != null)
            {
                theFeild = " MIN (" + min.getColumnText() + ")" + min.getAS();
            }
            else if (average != null)
            {
                theFeild = " AVG (" + average.getColumnText() + ")" + average.getAS();
            }
            else if (count != null)
            {
                theFeild = " COUNT (" + count.getColumnText() + ")" + count.getAS();
            }
            else if (first != null)
            {
                theFeild = " FIRST (" + first.getColumnText() + ")" + first.getAS();
            }
            else if (last != null)
            {
                theFeild = " LAST (" + last.getColumnText() + ")" + last.getAS();
            }
            else if (sum != null)
            {
                theFeild = " SUM (" + sum.getColumnText() + ")" + sum.getAS();
            }

            return theFeild;
        }
    }
}
