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
        public object Post(object value)
        {
            //Dictionary<string, List<Dictionary<string, string>>>
            //return value;
            var js = new JsonSerializer();
            string test =
                "{\"reportInformation\":\"Database 2: Employees, Sales | Database 3: Products, Testing\",\"date\":\"Date Generated\",\"columns\":[\"Id\",\"ItemName\",\"Description\",\"Stock\",\"ItemId\",\"Lifetime\",\"Notes\"],\"rows\":[{\"Id\":\"123\",\"ItemName\":\"Lens\",\"Description\":\"A lens to see.\",\"Stock\":\"150\",\"ItemId\":\"5679435\",\"Lifetime\":\"400000\",\"Notes\":\"Needs reordering\"},{\"Id\":\"234\",\"ItemName\":\"Frame\",\"Description\":\"A frame for a lens.\",\"Stock\":\"15\",\"ItemId\":\"1534723\",\"Lifetime\":\"300000\",\"Notes\":\"In Stock\"}]}";
            return test; 
        }
    }
}
