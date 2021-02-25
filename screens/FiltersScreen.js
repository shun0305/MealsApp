import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from '../constants/Colors';

const FilterSwitch = props => {
    return (<View style={styles.filterContent}>
        <Text>{props.label}</Text>
        <Switch
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
            value={props.state}
            onValueChange={props.onChange}
        />
    </View>

    )
};

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoesFree, setIsLactoesFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoesFree: isLactoesFree,
            vegan: isVegan,
            isvegetarian: isVegetarian
        };
        console.log(appliedFilters)
    }, [isGlutenFree, isLactoesFree, isVegan, isVegetarian]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The Filters Screen!</Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label='Lactose-free'
                state={isLactoesFree}
                onChange={newValue => setIsLactoesFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Save'
                iconName='ios-save'
                onPress={navData.navigation.getParam('save')} />
        </HeaderButtons>

    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    },
});

export default FiltersScreen;