import React from 'react';
import { View, TouchableWithoutFeedback, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import { saveAppOpeningTime, getLastUpdateTimeOfPopUpScreen } from '../../store/actions';
import { connect } from 'react-redux';
import { popUpScreenStyles } from '../../config/StylesCss';

const db = database()


class HomePopUp extends React.Component {
    constructor() {
        super();
        this.state = { modalVisible: false, popupScreen: '' };
    }

    componentDidMount() {
        this.checkDate()
    }
    checkDate() {
        try {
            if (this.props.dateOfLastOpen) {
                let Currentdate = (new Date).getDate()
                if (Currentdate !== this.props.dateOfLastOpen) { this.popupDataBase() } else {
                    this.checkLastUpdatedPopupDate()
                }
            } else { this.popupDataBase() }
        } catch (e) {

        }
    }
    checkLastUpdatedPopupDate() {
        try {
            db.ref('popupScreenLastUpdate').once('value').then(e => {
                let timStamp = e.val()
                if (timStamp) {
                    if (this.props.isPopupUpdated) {
                        if (this.props.isPopupUpdated !== timStamp) {
                            this.props.getLastUpdateTimeOfPopUpScreen(timStamp)
                            this.popupDataBase()
                        } else {
                            this.setState({ modalVisible: false })
                        }
                    } else {
                        this.props.getLastUpdateTimeOfPopUpScreen(timStamp)
                        this.popupDataBase()
                    }
                } else {
                    this.setState({ modalVisible: false })
                }
            })
        } catch (error) {
            this.setState({ modalVisible: false })
        }
    }
    popupDataBase() {
        try {
            db.ref('popupScreen').once('value').then(e => {
                let popupScreen = e.val()
                if (popupScreen) {
                    let date = (new Date).getDate()
                    this.props.saveAppOpeningTime(date)
                    this.setState({ modalVisible: true, popupScreen })
                } else {
                    this.setState({ modalVisible: false })
                }
            })
        } catch (error) {
            this.setState({ modalVisible: false })
        }
    }

    openLink() {
        if (this.state.popupScreen.isLink) {
            this.setState({ modalVisible: false }, () => this.props.navigateProp.navigate("RenderHTMLContainer", { link: this.state.popupScreen.link, header: this.state.popupScreen.label, }))
        }
        if (this.state.popupScreen.isHtml) {
            this.setState({ modalVisible: false }, () => this.props.navigateProp.navigate("RenderHTMLContainer", { header: this.state.popupScreen.label, htmlData: this.state.popupScreen.html }))
        }
    }
    modalDataRendering() {
        return <TouchableWithoutFeedback onPress={() => { this.openLink() }}>
            <Image
                style={popUpScreenStyles.modalImageStyle}
                source={{ uri: this.state.popupScreen.ImageUrl }}
                resizeMode='contain'
            />
        </TouchableWithoutFeedback>
    }
    renderModal() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setState({ modalVisible: false })}>
                <View style={{ flex: 0.9, margin: 40, backgroundColor: !!this.state.popupScreen && (this.state.popupScreen.color !== '' ? this.state.popupScreen.color : 'white'), elevation: 25, borderRadius: 10 }}>
                    <Icon
                        onPress={() => { this.setState({ modalVisible: false }); }}
                        name='times-circle'
                        style={popUpScreenStyles.modalCancleIcn}
                    />
                    {this.modalDataRendering()}
                </View>
            </Modal>
        )
    }

    render() {
        return !!this.state.modalVisible && !!this.state.popupScreen && this.renderModal()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAppOpeningTime: (time) => dispatch(saveAppOpeningTime(time)),
        getLastUpdateTimeOfPopUpScreen: (timStamp) => dispatch(getLastUpdateTimeOfPopUpScreen(timStamp)),
    }
}

const mapStateToProps = (props) => {
    const { general } = props;

    return {
        dateOfLastOpen: general.dateOfLastOpen,
        isPopupUpdated: general.isPopupUpdated,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePopUp)