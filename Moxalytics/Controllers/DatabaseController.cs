using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Script.Serialization;
using Microsoft.Ajax.Utilities;
using Moxalytics.Models;

// Use for getting information about the databases and the data contained within them.
using Newtonsoft.Json;

namespace Moxalytics.Controllers
{
    //public class Queries
    //{
    //    public Var JOINS { get; set; }
    //    public Var SELECT { get; set; }
    //    public Var WHERE { get; set; }
    //    public Var FROM { get; set; }
    //    public Var ORDERBY { get; set; }
    //}

    [RoutePrefix("api/Database")]
    public class DatabaseController : ApiController
    {
        private SQLCommand sqlCommand = new SQLCommand();

        // May want a get all method... Get() api/Database perhaps?
        
        // GET: api/Database
        [Route("")]
        public IEnumerable<string> Get()
        {
            // Maybe turn this into a generic call that gets everything?
            return new string[] { "Please select a", "server" };
        }

        // GET: api/Database/server
        [Route("{server}")]
        public IEnumerable<string> Get(string server)
        {
            // Returns a list of the databases on the specified server
            server = server.Replace("--", "\\"); // The -- is used to represent a \, for example esp\xray
            var test = sqlCommand.getDBsOnServer(server);
            return sqlCommand.getDBsOnServer(server);
        }

        // GET: api/Database/server/database
        [Route("{server}/{database}")]
        public IEnumerable<string> Get(string server, string database)
        {
            // Call api/Database/servername/databasename;
            server = server.Replace("--", "\\");
            // Don't know how this is going to work with spaces in the database name ...
            // May need to do some additional parsing to remove + or %20 (for spaces)
            return sqlCommand.getTablesInDatabase(server, database);
        }

        [Route("{server}/{database}/{table}")]
        public IEnumerable<string> Get(string server, string database, string table)
        {
            server = server.Replace("--", "\\");
            // Might need some parsing here as well. See server/database above.
            return sqlCommand.getColumnsInTable(server, database, table);
        }

        // POST: api/Database
        // POSTs the SQL operations to the server. Data will need to be sanitized.
        [Route("")]
        [HttpPost]
        public Dictionary<string, List<Dictionary<string, string>>> Post(object value)
        {
            // This might be moving to the ReportController
            JavaScriptSerializer js = new JavaScriptSerializer();

            //dynamic obj = js.Deserialize<dynamic>(value);

            //var joins = value["JOINS"];
            ////var innerJoinTables = joins[0]["type"]; // Get the INNER join tables
            ////var outerJoinTables = joins[1]["type"];
            //var select = value["SELECT"];
            //var where = value["WHERE"];
            //var from = value["FROM"];
            //var orderby = value["ORDERBY"];

            return new Dictionary<string, List<Dictionary<string, string>>>();
        }
    }
}
