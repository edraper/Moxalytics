using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moxalytics
{
    public class Joins
    {
        public string type = null;
        public List<JoinTables> joinTables = null;
        private string joinString = string.Empty;

        public string constructJoin()
        {
            if (type == null)
                type = " INNER";
            for (int i = 0; i < joinTables.Count; i++)
            {
                if (i == 0)
                    joinString = " " + joinTables[i].leftTable.getJoinText() + " " + type + " JOIN" + joinTables[i].rightTable.getJoinText() + " ON" + joinTables[i].leftTable.getJoinColumnText() + " =" + joinTables[i].rightTable.getJoinColumnText();
                else
                    joinString += " AND" + joinTables[i].leftTable.getJoinColumnText() + " =" + joinTables[i].rightTable.getJoinColumnText();

            }

            return joinString;
        }

        public string constructAdditionalJoins()
        {
            if (type == null)
                type = "INNER";
            for (int i = 0; i < joinTables.Count; i++)
            {
                if (i == 0)
                    joinString = " " + type + " JOIN" + joinTables[i].rightTable.getJoinText() + " ON" + joinTables[i].leftTable.getJoinColumnText() + " =" + joinTables[i].rightTable.getJoinColumnText();
                else
                    joinString += " AND" + joinTables[i].leftTable.getJoinColumnText() + " =" + joinTables[i].rightTable.getJoinColumnText();

            }

            return joinString;
        }
    }
}
