/* --- Zmq Commands --- */
// progress 1/1

export interface GetZmqNotifications {
  method: 'getzmqnotifications';
  params: [];
  response: {
    type: string;
    address: string;
  }[]
}