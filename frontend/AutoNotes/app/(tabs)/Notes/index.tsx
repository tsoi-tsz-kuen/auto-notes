import { Button, Text, View } from 'react-native'; 



export default function NotesScreen ()  {
    return  (
         
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notes screen</Text>
            <Button
              title="Go to Details"
              onPress={() => {}}
            />
          </View>
        
    );
}