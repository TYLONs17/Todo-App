import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LottieView from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<MaterialIcons name="explore" size={310} style={styles.headerImage} />}>

      <LottieView source={require('@/assets/images/explore.json')} style={{width: 400, height: 400, flex: 1, paddingRight: 20  }} autoPlay loop />

      <ThemedText style={styles.center} type="title">Nothing to see here.</ThemedText>
      <ThemedText style={styles.center} >Move along!</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -150,
    left: -50,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  center: {
    margin: "auto",
  },
});
