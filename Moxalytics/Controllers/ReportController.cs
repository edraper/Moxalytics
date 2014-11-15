using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

// Submits report parameters and retrieves the report from the server.
namespace Moxalytics.Controllers
{
    [RoutePrefix("api/Report")]
    public class ReportController : ApiController
    {
        // GET: api/Report
        [Route("")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Report/5
        [Route("{reportID}")]
        public string Get(int reportId)
        {
            // Gets a report with a specific id.
            // Depends on implementation
            return "value";
        }

        // POST: api/Report
        public void Post([FromBody]string value)
        {
            // Receive the report parameters and forward them to the backend.
        }
    }
}
