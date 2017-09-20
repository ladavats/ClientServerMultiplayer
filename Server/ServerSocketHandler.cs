using System;
using System.Timers;
using System.Web.Script.Serialization;
using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using Server.Entity;

namespace Server
{
    public class ServerSocketHandler : WebSocketHandler
    {

        private static readonly WebSocketCollection Clients = new WebSocketCollection();
        private static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer();
        private static readonly EntityRepository EntityRepository = new EntityRepository();

        //here we have lists that we loads up before the game starts and any client can connect.
        //private static List<Entity> Entities { get; set; } = new List<Entity>();
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
            Clients.Broadcast(Serializer.Serialize(new EntitiesPositionsResponse(EntityRepository.GetUpdatedEntityPositions())));
        }
        public override void OnOpen()
        {
            Clients.Add(this);
            EntityRepository.Connect(new Entity.Entity(UserId, 50, 90));
        }

        public override void OnMessage(string message)
        {
            var messageType = JsonConvert.DeserializeObject<WebSocketMessage>(message);

            switch (messageType.MessageType)
            {
                case WebSocketMessageTypes.EntityPositionUpdateRequest:
                    var entityPositionUpdateRequest = JsonConvert.DeserializeObject<EntityPositionUpdateRequest>(message);
                    EntityRepository.UpdatePosition(entityPositionUpdateRequest);
                    break;
                default:
                    throw new Exception("Message Type Not Supported!");
            }
        }

        public override void OnClose()
        {
            EntityRepository.Close(UserId);
            Clients.Remove(this);
        }
    }
}