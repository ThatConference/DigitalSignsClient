import gql from 'graphql-tag';
import React, { PureComponent, Fragment } from 'react';
import { Query, Subscription } from 'react-apollo';
import * as _ from 'lodash';

import NewFloorMap from './FloorMap';
import './Map.css';

const getDevices = gql`
    query getDevices {
        devices {
            coreId
            roomName
            particleId
            id
        }
    }
`;

const onTempChanged = gql`
    subscription onTempChanged {
        roomTempChanged {
            coreId: coreid
            data {
                temp: dhtTemperature
            }
        }
    }
`;

const onSpeakerStatusChange = gql`
    subscription onSpeakerStatusChange {
        speakerStatusChanged(roomId: 0) {
            coreId: coreid
            data
        }
    }
`;

class NewMap extends PureComponent {
  componentDidMount() { }

  render() {
    return (
      <Query query={getDevices}>
        {({ subscribeToMore, ...results }) => (
          <NewFloorMap
            {...results.data}
            subscribeToOnTempChanged={() =>
              subscribeToMore({
                document: onTempChanged,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const d = subscriptionData.data.roomTempChanged;
                  this.temps = {
                    ...this.temps,
                    [d.coreId]: d.data.temp,
                  };

                  return prev;
                },
              })
            }
          />
        )}
      </Query>
    );
  }
}

export default NewMap;
