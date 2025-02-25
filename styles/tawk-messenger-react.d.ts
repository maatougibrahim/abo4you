// tawk-messenger-react.d.ts
declare module '@tawk.to/tawk-messenger-react' {
    import { ForwardRefExoticComponent, RefAttributes } from 'react';
  
    interface TawkMessengerProps {
      propertyId: string;
      widgetId: string;
      onLoad?: () => void;
    }
  
    const TawkMessengerReact: ForwardRefExoticComponent<TawkMessengerProps & RefAttributes<any>>;
    export default TawkMessengerReact;
  }