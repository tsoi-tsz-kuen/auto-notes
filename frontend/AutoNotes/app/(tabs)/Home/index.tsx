import { Button, Text, View } from 'react-native'; 



export default function HomeScreen ()  {
    return  (
         
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen</Text>
            <Button
              title="Go to Details"
              onPress={() => {}}
            />
          </View>
        
    );
}