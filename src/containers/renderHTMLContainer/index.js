import React, { createRef } from 'react';
import { useWindowDimensions, ScrollView, Linking, SafeAreaView, View } from 'react-native';
import { HeaderDivComp } from "../../components";
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

let header = ""
let htmlData = ""
let link = ""
export default RenderHTMLContainer = (props) => {
    // let web = createRef()
    const { width } = useWindowDimensions();
    let { route } = props;
    if (route && route.params) {
        let obj = route.params;
        if (obj.link) {
            link = obj.link
        }
        if (obj.htmlData) {
            htmlData = obj.htmlData
        }
        if (obj.name) {
            if (obj.name === "aboutUs") {
                let aboutUs = useSelector(({ general }) => general.aboutUs)
                htmlData = aboutUs.text
            }
            if (obj.name === "donateUs") {
                let donateUs = useSelector(({ general }) => general.donateUs)
                htmlData = donateUs.text
            }
        }
        if (obj.header) {
            header = obj.header
        }

        // obj.isEventHtml
    }
    function onPress(event, href) {
        if (href) {
            Linking.openURL(href)
        }
    }
    // const errorHandling = (error) => {
    //     if (error.nativeEvent.description === 'net::ERR_FAILED') {
    //         web.reload()
    //     }
    // }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#725054" }}>
            <HeaderDivComp heading={header} />
            {!!htmlData &&
                <View style={{ flex: 1, marginTop: 60, margin: 10, backgroundColor: "#ECEAE4", padding: 10, borderRadius: 10 }}>
                    <ScrollView>
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: htmlData }}
                            renderersProps={{ a: { onPress: onPress } }}
                        />
                    </ScrollView>
                </View>
            }
            {!!link && <WebView
                // ref={ref => { web = ref; }}
                // onError={(e) => { errorHandling(e) }}
                originWhitelist={['*']}
                source={{ uri: link }}
                style={{ marginTop: 50 }}

            />}
        </SafeAreaView>
    );
}