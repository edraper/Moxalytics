using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Moxalytics.Models;

// Use for getting information about the databases and the data contained within them.
namespace Moxalytics.Controllers
{
    [RoutePrefix("api/Database")]
    public class DatabaseController : ApiController
    {
        private SQLCommand sqlCommand = new SQLCommand();

        // GET: api/Database
        [Route("")]
        public IEnumerable<string> Get()
        {
            return new string[] { "Please select a", "server" };
        }

        // GET: api/Database/server
        [Route("{server}")]
        public IEnumerable<string> Get(string server)
        {
            server = server.Replace("--", "\\"); // The -- is used to represent a \, for example esp\xray
            return sqlCommand.getDBsOnServer(server);
        }

        // GET: api/Database/server/table
        [Route("{server}/{table}")]
        public IEnumerable<string> Get(string server, string table)
        {
            // Test call. This works properly.
            // Call api/Database/servername/tablename
            List<string> list = new List<string> {"server: " + server, "table: " + table};
            return list;
        }

        // POST: api/Database
        // POSTs the SQL operations to the server. Data will need to be sanitized.
        public void Post([FromBody]string value)
        {
            // This might be moving to the ReportController
        }
    }
}
