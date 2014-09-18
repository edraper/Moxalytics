using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Moxalytics.Startup))]
namespace Moxalytics
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
