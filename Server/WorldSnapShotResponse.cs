using System;
using System.Collections.Generic;

namespace Server
{
    [Serializable]
    public class WorldSnapShotResponse : WebSocketMessage
    {
         public IEnumerable<Entity> Entities { get; set; }

        public WorldSnapShotResponse(IEnumerable<Entity> entities)
        {
            Entities = entities;
            MessageType = WebSocketMessageTypes.WorldSnapShotResponse;
        }
    }
}