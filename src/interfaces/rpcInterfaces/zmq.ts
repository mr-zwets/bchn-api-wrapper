/* --- Zmq Commands --- */
// progress 1/1

/** Returns active ZMQ notification endpoints. */
export interface GetZmqNotifications {
  method: 'getzmqnotifications';
  params: [];
  response: {
    type: string;
    address: string;
  }[]
}
