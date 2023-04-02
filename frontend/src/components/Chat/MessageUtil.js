import { Message, MessageImageContent } from "@chatscope/chat-ui-kit-react";

const MessagesUtil = {
  mapMessageResponse: (data, readerIdNameMap, currentUserId) => {
    return data.map((msg) => {
      const sender = readerIdNameMap.get(msg.user_id);

      const readers = msg.message_readers
        .map((r) => readerIdNameMap.get(r.user_id))
        .join(", ");

      const readByFooterText = readers ? `Read by: ${readers}` : "Sent";

      const attachements = msg.message_attachments;

      const isAttachement =
        typeof attachements !== "undefined" && attachements.length > 0;

      return (
        <Message
          key={msg.id}
          model={{
            message: msg.message,
            sentTime: msg.create_datetime,
            direction: msg.user_id === currentUserId ? 0 : 1,
          }}
        >
          {isAttachement && (
            <Message.CustomContent>
              <p>{msg.message}</p>
              <img
                alt={msg.message}
                src={attachements[0].attachment}
                width={300}
                height={300}
              />
            </Message.CustomContent>
          )}
          <Message.Header
            style={{ display: "block !important" }}
            sender={sender}
            sentTime={`(${msg.create_datetime})`}
          />
          <Message.Footer
            style={{ display: "block !important" }}
            sender={readByFooterText}
          />
        </Message>
      );
    });
  },
  mapSendMessageResponse: (data, readerIdNameMap) => {
    const sender = readerIdNameMap.get(data.user_id);

    return (
      <Message
        key={data.id}
        model={{
          message: data.message,
          sentTime: data.create_datetime,
          direction: 0,
        }}
      >
        <Message.Header
          style={{ display: "block !important" }}
          sender={sender}
        />
        <Message.Footer style={{ display: "block !important" }} />
      </Message>
    );
  },
};

export default MessagesUtil;
