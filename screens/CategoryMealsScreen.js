import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealsScreen = ({ navigation }) => {

    const renderMealItem = itemData => {
        return <MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity.toUpperCase()}
            affordability={itemData.item.affordability.toUpperCase()}
            onSelectMeal={() => {
                navigation.navigate({
                    routeName: 'MealDetail', params: {
                        mealId: itemData.item.id
                    }
                });
            }} />;
    };

    const catId = navigation.getParam('categoryId');

    const displayMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    return (
        <View style={styles.screen}>
            <FlatList
                data={displayMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: '90%' }}
            />
        </View>
    )
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoryMealsScreen;