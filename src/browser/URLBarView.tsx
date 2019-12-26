import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Button, $FlexboxLayout } from "react-nativescript";
import { GradientProgressBarConnected } from "../Widgets/GradientProgressBar";
import { ToolbarButton } from "./ToolbarButton";
import { AutocompleteTextField } from "~/Widgets/AutocompleteTextField";
import { TabLocationView, TabLocationViewConnected } from "./TabLocationView";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";
import { BackButtonConnected, ForwardButtonConnected, StopReloadButtonConnected, TabsButtonConnected, MenuButtonConnected, CancelButtonConnected } from "./BarButtons";
import { connect } from "react-redux";
import { WholeStoreState } from "~/store/store";
import { View } from "react-native";

/* https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift */

interface Props {
    slotBackgroundColor?: string,
    textFieldBackgroundColor?: string,
    buttonBackgroundColor?: string,
    inOverlayMode: boolean,
    toolbarIsShowing: boolean,
    // location: string, // locationTextField?.text
}

interface State {
    // text: string, // locationTextField?.text
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift#L786
class ToolbarTextField extends React.Component<{}, {}>{
    // Just a themeable AutocompleteTextField
    render(){
        return (
            <AutocompleteTextField/>
        );
    }
}

// We need a subclass so we can setup the shadows correctly
// This subclass creates a strong shadow on the URLBar
class TabLocationContainerView extends React.Component<{}, {}>{
    render(){
        return (
            <View>

            </View>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift#L108
class LocationContainer extends React.Component<{}, {}>{
    render(){
        return (
            <TabLocationContainerView/>
        );
    }
}

export class URLBarView extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        
        this.state = {
            location: "https://www.birchlabs.co.uk",
        };
    }

    render(){
        const { slotBackgroundColor = "gray", textFieldBackgroundColor = "white", buttonBackgroundColor = "transparent", toolbarIsShowing, inOverlayMode } = this.props;
        const { } = this.state;

        let stackContents: React.ReactNode;

        if(inOverlayMode){
            // i.e. URL bar's text field has been focused and the browser displays an overlay over the webpage.
            stackContents = (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: "auto",
                        width: "100%"
                    }}
                >
                    {/* AKA locationTextField */}
                    <ToolbarTextField/>
                    <CancelButtonConnected style={{ backgroundColor: buttonBackgroundColor }}/>
                </View>
            );
        } else if(toolbarIsShowing){
            // i.e. landscape (so show all the items that the footer would normally handle)
            stackContents = (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: "auto",
                        width: "100%"
                    }}
                >
                    <BackButtonConnected style={{ backgroundColor: buttonBackgroundColor }}/>
                    <ForwardButtonConnected style={{ backgroundColor: buttonBackgroundColor }}/>
                    <StopReloadButtonConnected style={{ backgroundColor: buttonBackgroundColor }}/>
                    {/* AKA locationView. */}
                    <TabLocationViewConnected
                        style={{
                            flexGrow: 1,
                        }}
                        slotBackgroundColor={slotBackgroundColor} buttonBackgroundColor={buttonBackgroundColor} textFieldBackgroundColor={textFieldBackgroundColor}
                    />
                    <TabsButtonConnected style={{ backgroundColor: buttonBackgroundColor }}/>
                    <MenuButtonConnected style={{ backgroundColor: buttonBackgroundColor }}/>
                </View>
            );
        } else {
            // i.e. portrait (so hide all the items that the footer will be handling)
            stackContents = (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: "auto",
                        width: "100%"
                    }}
                >
                    {/* AKA locationView. */}
                    <TabLocationViewConnected
                        style={{
                            flexGrow: 1,
                        }}
                        slotBackgroundColor={slotBackgroundColor}
                        buttonBackgroundColor={buttonBackgroundColor}
                        textFieldBackgroundColor={textFieldBackgroundColor}
                    />
                </View>
            );
        }

        return (
            <View
                style={{
                    flexDirection: "column",
                }}
            >
                {stackContents}
                <GradientProgressBarConnected
                    width={{ value: 100, unit: "%" }}
                />
            </View>
        );
    }
}