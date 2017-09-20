using System;
using System.Collections.Generic;

namespace Server
{
    [Serializable]
    public class EntitiesPositionsResponse : WebSocketMessage
    {
        public IEnumerable<Entity> Entities { get; set; }

        public EntitiesPositionsResponse(IEnumerable<Entity> entities)
        {
            Entities = entities;
            MessageType = WebSocketMessageTypes.EntitiesPositionsResponse;
        }
    }
}