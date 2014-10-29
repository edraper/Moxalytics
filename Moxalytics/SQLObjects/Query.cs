using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moxtest
{
    public class Query
    {
        public Select select = null;
        public Column from = null;
        public List<Joins> joins = null;        
        public List<Where> where = null;
        public List<OrderBy> orderBy = null;
        public string sqlString = null;

        public string constructSQL()
        {
            //Select
            sqlString = "SELECT " + select.constructSelect() + "\n";
           

            //From
            if (joins == null)
                sqlString += " FROM" + from.getColumnText();
            else
            {
                for (int i = 0; i < joins.Count; i++)
                {
                    if (i == 0)
                        sqlString += " From" + joins[0].constructJoin() + "\n";
                    else
                        sqlString += joins[0].constructAdditionalJoins() + "\n";
                }
            }
               
            //Where

            if (where != null)
            {
                for (int i = 0; i < where.Count; i++)
                {
                    if (i == 0)
                        sqlString += " WHERE " + where[i].constructWhere();
                    else
                        sqlString += where[i].bLogic + " " + where[i].constructWhere();
                }
                
            }

            return sqlString;
        }
    }
}
