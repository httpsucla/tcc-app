import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fer.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt';

export default function Calendario() {
    return (
        <View>
            <CalendarList

                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#414BB2',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#414BB2',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#414BB2',
                    selectedDotColor: '#ffffff',
                    disabledArrowColor: '#d9e1e8',
                    textDayFontWeight: '300',
                    textDayHeaderFontWeight: '300'
                }}
                pastScrollRange={50}
                hideExtraDays={true}
                
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Specify how each item should be rendered in agenda
                renderItem={(item, firstItemInDay) => {
                    return <View />;
                }}
                // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                renderDay={(day, item) => {
                    return <View />;
                }}
                // Specify how empty date content with no items should be rendered
                renderEmptyDate={() => {
                    return <View />;
                }}
                // Specify how agenda knob should look like
                renderKnob={() => {
                    return <View />;
                }}
                // Override inner list with a custom implemented component
                renderList={listProps => {
                    return <MyCustomList {...listProps} />;
                }}
                // Specify what should be rendered instead of ActivityIndicator
                renderEmptyData={() => {
                    return <View />;
                }}
                // Specify your item comparison function for increased performance
                rowHasChanged={(r1, r2) => {
                    return r1.text !== r2.text;
                }}
                // Hide knob button. Default = false
                hideKnob={true}
                // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                showClosingKnob={false}
                // By default, agenda dates are marked if they have at least one item, but you can override this if needed

                // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                disabledByDefault={true}
                // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
                onRefresh={() => console.log('refreshing...')}
                // Set this true while waiting for new data from a refresh
                refreshing={false}
                // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
                refreshControl={null}
            // Agenda theme

            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#292929f3',
        fontSize: 70
    }
});