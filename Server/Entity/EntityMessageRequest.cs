﻿namespace Server.Entity
{
    public class EntityMessageRequest : WebSocketMessage
    {
        public readonly string SendByUserId;
        public readonly string MessageText;
        public new string MessageType => this.GetType().ToString();
        public EntityMessageRequest(string sendByUserId, string messageText)
        {
            SendByUserId = sendByUserId;
            MessageText = messageText;
        }
    }
}