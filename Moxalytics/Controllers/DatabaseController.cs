using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Moxalytics.Models;

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

        // POST: api/Database
        // POSTs the SQL operations to the server. Data will need to be sanitized.
        public void Post([FromBody]string value)
        {

        }

        // PUT: api/Database/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Database/5
        public void Delete(int id)
        {
        }
    }
}
