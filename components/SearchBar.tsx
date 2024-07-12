
import { Colors } from '@/constants/Colors';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

interface searchBarProps {
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    handleSearchTasks: () => void;
};




export default function SearchBar ({ searchQuery, setSearchQuery, handleSearchTasks }: searchBarProps) {
    const { theme } = useThemeContext();
    const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

    return (
        <View style={styles.searchBar}>
            <Ionicons name="search-circle-sharp" size={28} color="skyblue" style={styles.searchIcon} />
            <TextInput
                style={[styles.searchInput, {color: Colors[currentTheme].text}]}
                placeholder="Search tasks"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearchTasks}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 5,
        borderRadius: 8,
        borderBottomWidth: 1, 
        borderBlockColor: 'skyblue',
    },
    searchIcon: {
        marginRight: 10, 
    },
    searchInput: {
        flex: 1,
    },
});
