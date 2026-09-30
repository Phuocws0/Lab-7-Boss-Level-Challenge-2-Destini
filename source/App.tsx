import { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stories = [
  {
    text: 'Your car has blown a tire on a winding road in the middle of nowhere with no cell phone reception. You decide to hitchhike. A rusty pickup truck rumbles to a stop next to you. A man with a wide brimmed hat with soulless eyes opens the passenger door for you and asks: “Need a ride, boy?”.',
    choices: ["I'll hop in. Thanks for the help!", "Better ask him if he's a murderer first."],
  },
  {
    text: 'He nods slowly, unphased by the question.',
    choices: ["At least he's honest. I'll climb in.", 'Wait, I know how to change a tire.'],
  },
  {
    text: 'As you begin to drive, the stranger starts talking about his relationship with his mother. He gets angrier and angrier by the minute. He asks you to open the glovebox. Inside you find a bloody knife, two severed fingers, and a cassette tape of Elton John. He reaches for the glove box.',
    choices: ['I love Elton John! Hand him the cassette tape.', "It's him or me! You take the knife and stab him."],
  },
  {
    text: 'What? Such a cop out! Did you know traffic accidents are the second leading cause of accidental death for most adult age groups?',
    choices: ['Restart', ''],
  },
  {
    text: 'As you smash through the guardrail and careen towards the jagged rocks below you reflect on the dubious wisdom of stabbing someone while they are driving a car you are in.',
    choices: ['Restart', ''],
  },
  {
    text: 'You bond with the murderer while crooning verses of “Can you feel the love tonight”. He drops you off at the next town. Before you go he asks you if you know any good places to dump bodies. You reply: “Try the pier”.',
    choices: ['Restart', ''],
  },
];

const nextStory: Record<number, Record<number, number>> = {
  0: { 1: 2, 2: 1 },
  1: { 1: 2, 2: 3 },
  2: { 1: 5, 2: 4 },
};

export default function App() {
  const [storyIndex, setStoryIndex] = useState(0);
  const story = stories[storyIndex];
  const isEnding = storyIndex >= 3;

  const choose = (choice: number) => {
    if (isEnding) {
      setStoryIndex(0);
      return;
    }
    const next = nextStory[storyIndex]?.[choice];
    if (next !== undefined) setStoryIndex(next);
  };

  return (
    <ImageBackground source={require('./assets/background.png')} resizeMode="cover" style={styles.background}>
      <View style={styles.scrim}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="#15202c" />
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.eyebrow}>YOUR CHOICES SHAPE THE STORY</Text>
              <Text style={styles.title}>Destini</Text>
            </View>
            <View style={styles.storyCard}>
              {isEnding && <Text style={styles.endingLabel}>THE END</Text>}
              {!isEnding && <Text style={styles.stepLabel}>STORY {storyIndex + 1} OF 3</Text>}
              <ScrollView contentContainerStyle={styles.storyScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.storyText}>{story.text}</Text>
              </ScrollView>
            </View>
            <View style={styles.choices}>
              {isEnding ? (
                <Pressable accessibilityRole="button" onPress={() => choose(1)} style={({ pressed }) => [styles.choiceButton, styles.restartButton, pressed && styles.pressed]}>
                  <Text style={styles.choiceText}>RESTART STORY</Text>
                </Pressable>
              ) : (
                story.choices.map((choice, position) => (
                  <Pressable key={position} accessibilityRole="button" accessibilityLabel={choice} onPress={() => choose(position + 1)} style={({ pressed }) => [styles.choiceButton, position === 0 ? styles.firstChoice : styles.secondChoice, pressed && styles.pressed]}>
                    <Text style={styles.choiceNumber}>0{position + 1}</Text>
                    <Text style={styles.choiceText}>{choice}</Text>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#17222e' },
  scrim: { flex: 1, backgroundColor: 'rgba(11, 17, 25, 0.70)' },
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 20, paddingBottom: 18 },
  header: { alignItems: 'center' },
  eyebrow: { color: '#d5dbe2', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  title: { color: '#ffffff', fontSize: 38, fontWeight: '800', marginTop: 6 },
  storyCard: { flex: 1, marginVertical: 18, paddingHorizontal: 21, paddingTop: 20, paddingBottom: 10, borderRadius: 22, backgroundColor: 'rgba(19, 28, 39, 0.77)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  stepLabel: { color: '#b3c5d6', fontSize: 10, fontWeight: '800', letterSpacing: 1.8, marginBottom: 14 },
  endingLabel: { color: '#ffd280', fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 13 },
  storyScroll: { flexGrow: 1, justifyContent: 'center', paddingBottom: 14 },
  storyText: { color: '#ffffff', fontSize: 19, lineHeight: 29, fontWeight: '500' },
  choices: { gap: 11 },
  choiceButton: { minHeight: 68, borderRadius: 16, paddingHorizontal: 17, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', elevation: 3 },
  firstChoice: { backgroundColor: '#e6a849' },
  secondChoice: { backgroundColor: '#d9e0e7' },
  restartButton: { backgroundColor: '#e6a849', justifyContent: 'center' },
  choiceNumber: { color: '#202b38', fontSize: 12, fontWeight: '900', marginRight: 12 },
  choiceText: { color: '#202b38', fontSize: 15, fontWeight: '700', flex: 1, lineHeight: 21 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});
