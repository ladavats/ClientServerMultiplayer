using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using System.Web.Script.Serialization;
using Microsoft.Web.WebSockets;
using Newtonsoft.Json;

namespace Server
{
    public class ServerSocketHandler : WebSocketHandler
    {
        private static readonly WebSocketCollection Clients = new WebSocketCollection();
        private static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer();
        //here we have lists that we loads up before the game starts and any client can connect.
        private static List<Entity> Entities { get; set; } = new List<Entity>();
        public string UserId { get; set; }

        private static readonly Timer BroadCastTimer = new Timer(200); //30 FPS
      
        public ServerSocketHandler(string userId)
        {
            UserId = userId;
            if (BroadCastTimer.Enabled) return;

            BroadCastTimer.Enabled = true;
            BroadCastTimer.Elapsed += Broadcast;
            BroadCastTimer.Start();
        }

        private static void Broadcast(object sender, ElapsedEventArgs e)
        {
            //send out all the clients that has previous value set. otherwise there has not been two position resported to the server.
            Clients.Broadcast(Serializer.Serialize(new EntitiesPositionsResponse(Entities)));
        }
        public override void OnOpen()
        {
            Clients.Add(this);
            var random = new Random();
            Entities.Add(new Entity(UserId,50,90));
            //Clients.Broadcast(Serializer.Serialize(new WorldSnapShotResponse(Entities)));
            //this.Send("Only for me");
        }

        public override void OnMessage(string message)
        {
            var messageType = JsonConvert.DeserializeObject<WebSocketMessage>(message);

            switch (messageType.MessageType)
            {
                case WebSocketMessageTypes.EntityPositionUpdateRequest:
                    var entityPositionUpdateRequest = JsonConvert.DeserializeObject<EntityPositionUpdateRequest>(message);
                    var entity = Entities.First(o => o.UserId == entityPositionUpdateRequest.UserId);
                    entity.X = entityPositionUpdateRequest.X;
                    entity.Y = entityPositionUpdateRequest.Y;
                    break;
                default:
                    throw new Exception("Message Type Not Supported!");
            }
        }

        public override void OnClose()
        {

            Entities.Remove(Entities.First(o=>o.UserId == this.UserId));
            //Clients.Broadcast("Player has left the game!");
            
            Clients.Remove(this);
            //Clients.Broadcast(Serializer.Serialize(new EntityMovementResponse(Entities)));
        }
    }
}