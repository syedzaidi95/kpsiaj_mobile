import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { onDownload, onShare } from '../../Functions/Functions';
import Pdf from 'react-native-pdf';
import { onShare } from '../../functions';

let Constitution = () => {
  let url =
    'https://kpsiaj.org/wp-content/uploads/2019/08/Constitution_and_Bye_Laws.pdf';
  const renderButtons = () => {
    let type = 'application/pdf';
    return (
      <View style={styles.btnContainer}>
        {/* <TouchableOpacity
          // onPress={() => onDownload(url, type)}
          style={styles.btn}>
          <Icon name="download" style={{fontSize: 22, color: '#725054'}} />
          <Text style={styles.btnTxt}>Save</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => onShare(url, type)}
          style={styles.btn}>
          <Icon name="share-square" style={{ fontSize: 22, color: '#725054' }} />
          <Text style={styles.btnTxt}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: "#725054"}}>
      <View style={{ flexDirection: 'column', flex: 1 , backgroundColor: "white"}}>
        <Pdf
          source={{ uri: url, cache: true }}
          style={{
            flex: 1,
            backgroundColor: '#725054',
            paddingBottom: 100
          }}
        />
        <View style={{ height: 100, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          {renderButtons()}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btnContainer: { flexDirection: 'row', display: 'flex' },
  btn: {
    flex: 1,
    backgroundColor: '#ECEAE4',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  btnTxt: { color: '#725054', fontSize: 14 },
});

Constitution = React.memo(Constitution);

export default Constitution;
