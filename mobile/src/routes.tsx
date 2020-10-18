import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Header } from './components/Header';
import { OrphanageData } from './pages/OrphanageData';
import { OrphanageDetails } from './pages/OrphanageDetails';
import { OrphanagesMap } from './pages/OrphanagesMap';
import { SelectMapPosition } from './pages/SelectMapPosition';

const { Navigator, Screen } = createStackNavigator();

export const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ cardStyle: { backgroundColor: '#F2F3F5' } }}>
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                    options={{ headerShown: false }}
                />

                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />

                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel title="Selecione no mapa" />
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel title="Informe os dados" />
                    }}
                />

            </Navigator>
        </NavigationContainer>
    );
}