namespace Server.Entity
{
    public class EntityPositionUpdateRequest : WebSocketMessage
    {
        public float X { get; set; }
        public float Y { get; set; }
        public new string MessageType => this.GetType().ToString();

        public EntityPositionUpdateRequest(float x, float y)
        {
            X = x;
            Y = y;
        }
    }
}