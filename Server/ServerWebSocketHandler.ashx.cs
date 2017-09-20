using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Web.WebSockets;

namespace Server
{
    /// <summary>
    /// Summary description for Test
    /// </summary>
    public class ServerWebSocketHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
            {
                context.AcceptWebSocketRequest(new ServerSocketHandler(context.Request.QueryString["UserId"]));
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}