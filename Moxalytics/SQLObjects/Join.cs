using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moxalytics.SQLObjects
{
    public class Join
    {
        public int index;
        public int thisJoinIndex = 0;
        public string LeftColumn = string.Empty;
        public string RightColumn = string.Empty;
        public string LeftTable = string.Empty;
        public string LeftDatabase = string.Empty;
        public string RightTable = string.Empty;
        public string RightDatabase = string.Empty;
        public string Server = string.Empty;
        public string theJoin = string.Empty;
        private List<string> And = new List<string>();

        public string generateOuterJoin()
        {
            return MakeJoin("FULL OUTER");
        }

        public string generateInnerJoin()
        {
            return MakeJoin("INNER");
        }

        public string generateLeftJoin()
        {
            return MakeJoin("LEFT OUTER");
        }

        public string generateRightJoin()
        {
            return MakeJoin("RIGHT OUTER");
        }

        public void MakeCompositeJoin(string LeftColumn, string rightColumn)
        {
            this.And.Add(" AND T1.[" + LeftColumn + "] = T2.[" + LeftColumn + "]");
        }
    

        private string MakeJoin(string joinType)
        {
            if (index == 0)
            {
                this.theJoin += " FROM [" + this.LeftDatabase + "].[dbo].[" + this.LeftTable + "]"+
                       " AS T1 " + joinType + " JOIN [" + this.RightDatabase + "].[dbo].[" + this.RightTable + "]" +
                       " AS T2 ON T1.[" + this.LeftColumn + "] = T2.[" + this.LeftColumn + "]";
                
                foreach (string and in And)
                    this.theJoin += and;

                this.thisJoinIndex++;
            }
            else 
            {
                theJoin += " " + joinType +" JOIN [" + RightDatabase + "].[dbo].[" + RightTable + "]" +
                       " AS T2 ON T1.[" + LeftColumn + "] = T2.[" + LeftColumn + "]";    
            }

            return theJoin;
        }

        
    }
}