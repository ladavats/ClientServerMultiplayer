using System;
using System.Collections.Generic;
using System.Linq;

namespace Server
{
    [Serializable]
    public class EntitiesPositionsResponse : WebSocketMessage
    {
        public IEnumerable<EntityPosition> Entities { get; set; }

        public EntitiesPositionsResponse(IEnumerable<EntityPosition> entities)
        {
            Entities = entities;
            MessageType = WebSocketMessageTypes.EntitiesPositionsResponse;
        }
    }

    public class EntityPosition
    {
        public string UserId { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
    }

    public class EntityRepository
    {
        public List<Entity> Entities { get; set; } = new List<Entity>();

        //ONLY SEND POSITION IF CURRENT POS <> LAST POSITION!!!
        public IEnumerable<EntityPosition> EntityPositions => this.Entities.Select(entity => new EntityPosition() { UserId = entity.UserId, X = entity.X, Y = entity.Y }).ToList();

        public void Add(Entity entity)
        {
            this.Entities.Add(entity);
        }

        public void Remove(string userId)
        {
            Entities.Remove(Entities.First(o => o.UserId == userId));
        }

        public void UpdatePosition(EntityPositionUpdateRequest updateRequest)
        {
            var entity = Entities.First(o => o.UserId == updateRequest.UserId);
            entity.X = updateRequest.X;
            entity.Y = updateRequest.Y;
        }
    }
}