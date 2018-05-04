![react-bell-chat logo](https://i.imgur.com/YhPrFWw.png)

# 🙊 react-bell-chat

A library of React components for building chat UIs.

# DEMO

[Live demo](https://peterkottas.github.io/react-bell-chat/)

[![NPM](https://nodei.co/npm/react-bell-chat.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-bell-chat/)

## Features

* Chat like scroll behaviour (eg. automatic scroll to bottom)
* Load more messages on scrolling to the top (with custom threshold)
* SUPER easy to use
* Customize anything
* Author avatars
* Last seen messages for each author
* Show if authors are typing or not
* Automatic date rows (when the following message is from a different date than the preceding one)

Keep in mind that this project is still in the early stages of development. If you encounter a bug or have a feature request, please create an issue.

## Installation

`npm install react-bell-chat --save`

OR

`yarn add react-bell-chat`

## Basic Usage

```typescript
import { ChatFeed } from 'react-bell-chat'

// Your code stuff...

render() {

  return (

    // Your JSX...

    <ChatFeed
      messages={this.state.messages} // Array: list of message objects
      authors={this.state.authors} // Array: list of authors
      yourAuthorId={2} // Number: Your author id (corresponds with id from list of authors)
    />

    // Your JSX...

  )

}
```

Make sure to keep a list of proper message objects in your class state.
Like so:

```typescript
//...
this.state = {
  messages: [
    {
      id: 1,
      authorId: 1,
      message: "Sample message",
      createdOn: new Date(),
      isSend: true
    },
    {
      id: 2,
      authorId: 2,
      message: "Second sample message",
      createdOn: new Date(),
      isSend: false
    },
  ],
  authors: [
    {
      id: 1,
      name: 'Mark',
      isTyping: true,
      lastSeenMessageId: 1
    },
    {
      id: 2,
      name: 'Peter',
      isTyping: false,
      lastSeenMessageId: 2
    }
  ]
};
//...
```

## API

Api is obtained as ref of the ChatFeed component. It's divided in 2 parts, feedApi and scrollApi. Ref gives you and object like this:
```typescript
interface ChatFeedApi {
  onMessageSend: () => void; // Should be called when user sends a message (this scrolls the component down)
  scrollApi: ChatScrollAreaApi;
}
```

Where scroll api is

```typescript
interface ChatScrollAreaApi {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  scrollTo: (top: number) => void;
  scrolledToBottom: () => boolean;
}
```

## Whole list of properties

```typescript
export interface ChatFeedProps {
  // Structural props
  className?: string;

  // Functional props
  messages: Message[];
  authors: Author[];
  yourAuthorId: number;
  hasOldMessages?: boolean;
  loadOldMessagesThreshold?: number;

  // Visual props
  bubblesCentered?: boolean;
  bubbleStyles?: ChatBubbleStyles;
  maxHeight?: string | number;
  minHeight?: string | number;

  // Switches
  showDateRow?: boolean;
  showRecipientAvatar?: boolean;
  showRecipientLastSeenMessage?: boolean;
  showIsTyping?: boolean;
  showLoadingMessages?: boolean;

  // Extra container styles for custom components
  showRecipientAvatarChatMessagesStyle?: React.CSSProperties;
  showRecipientLastSeenMessageChatMessagesStyle?: React.CSSProperties;
  showIsTypingChatMessagesStyle?: React.CSSProperties;

  // Custom components
  customLoadingMessages?: (props: LoadingMessagesProps) => JSX.Element;
  customChatBubble?: (props: ChatBubbleProps) => JSX.Element;
  customAvatar?: (props: AvatarProps) => JSX.Element;
  customScrollArea?: (props: ChatScrollAreaProps) => JSX.Element;
  customIsTyping?: (props: ChatScrollAreaProps) => JSX.Element;
  customLastSeenAvatar?: (props: LastSeenAvatarProps) => JSX.Element;
  customDateRow?: (props: DateRowProps) => JSX.Element;

  // Callbacks
  onLoadOldMessages?: () => Promise<void>; // Make sure to return promise that only resolves after state is updated.

  ref?: (api: ChatFeedApi) => void;
}
```

## FAQ

## Contributing!¡1 🔧

Contributions are always welcomed and encouraged.

## Development

```sh
npm run start
```

## Acknowledgments

This lib started as a fork from https://github.com/brandonmowat/react-chat-ui
