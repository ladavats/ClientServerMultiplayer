namespace Server.Entity
{
    public class EntityMessageResponse : WebSocketMessage
    {
        public readonly string SendByUserId;
        public readonly string MessageText;
        public new string MessageType => this.GetType().ToString();
        public EntityMessageResponse(string sendByUserId, string messageText)
        {
            SendByUserId = sendByUserId;
            MessageText = messageText;
        }
    }
}