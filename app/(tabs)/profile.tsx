import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  useColorScheme,
  Switch,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  LogOut, 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Settings, 
  Bell, 
  ChevronRight, 
  Moon 
} from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user, isLoading, error, isAuthenticated, login, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const handleLogout = () => {
    logout();
  };

  const handleSaveProfile = () => {
    // Save profile logic would go here
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[
        styles.container, 
        colorScheme === 'dark' && styles.darkContainer
      ]}>
        <View style={styles.header}>
          <Text style={[
            styles.headerTitle,
            colorScheme === 'dark' && styles.darkText
          ]}>Profile</Text>
        </View>

        <View style={styles.loginContainer}>
          <User size={64} color={colorScheme === 'dark' ? '#f9fafb' : '#1f2937'} />
          <Text style={[
            styles.loginTitle,
            colorScheme === 'dark' && styles.darkText
          ]}>Sign in to your account</Text>
          <Text style={[
            styles.loginSubtitle,
            colorScheme === 'dark' && styles.darkSubText
          ]}>Access your orders, favorites, and settings</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={[
                styles.input,
                colorScheme === 'dark' && styles.darkInput
              ]}
              placeholder="Email"
              placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[
                styles.input,
                colorScheme === 'dark' && styles.darkInput
              ]}
              placeholder="Password"
              placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
              secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={() => login('test@example.com', 'password')}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.registerContainer}>
            <Text style={[
              styles.registerText,
              colorScheme === 'dark' && styles.darkSubText
            ]}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[
      styles.container, 
      colorScheme === 'dark' && styles.darkContainer
    ]}>
      <View style={styles.header}>
        <Text style={[
          styles.headerTitle,
          colorScheme === 'dark' && styles.darkText
        ]}>Profile</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSaveProfile}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[
          styles.profileCard,
          colorScheme === 'dark' && styles.darkCard
        ]}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.defaultAvatar}>
                <Text style={styles.avatarText}>{userProfile.name.slice(0, 1)}</Text>
              </View>
            )}
          </View>
          
          {isEditing ? (
            <View style={styles.profileFields}>
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  colorScheme === 'dark' && styles.darkText
                ]}>Name</Text>
                <TextInput
                  style={[
                    styles.profileInput,
                    colorScheme === 'dark' && styles.darkInput
                  ]}
                  value={userProfile.name}
                  onChangeText={(text) => setUserProfile({...userProfile, name: text})}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  colorScheme === 'dark' && styles.darkText
                ]}>Email</Text>
                <TextInput
                  style={[
                    styles.profileInput,
                    colorScheme === 'dark' && styles.darkInput
                  ]}
                  value={userProfile.email}
                  onChangeText={(text) => setUserProfile({...userProfile, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  colorScheme === 'dark' && styles.darkText
                ]}>Phone</Text>
                <TextInput
                  style={[
                    styles.profileInput,
                    colorScheme === 'dark' && styles.darkInput
                  ]}
                  value={userProfile.phone}
                  onChangeText={(text) => setUserProfile({...userProfile, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={[
                styles.profileName,
                colorScheme === 'dark' && styles.darkText
              ]}>{userProfile.name}</Text>
              <Text style={[
                styles.profileEmail,
                colorScheme === 'dark' && styles.darkSubText
              ]}>{userProfile.email}</Text>
              <Text style={[
                styles.profilePhone,
                colorScheme === 'dark' && styles.darkSubText
              ]}>{userProfile.phone}</Text>
            </View>
          )}
        </View>

        <View style={styles.sectionTitle}>
          <Text style={[
            styles.sectionTitleText,
            colorScheme === 'dark' && styles.darkText
          ]}>My Account</Text>
        </View>

        <View style={[
          styles.menuCard,
          colorScheme === 'dark' && styles.darkCard
        ]}>
          <TouchableOpacity style={styles.menuItem}>
            <ShoppingBag size={20} color="#3b82f6" />
            <Text style={[
              styles.menuItemText,
              colorScheme === 'dark' && styles.darkText
            ]}>My Orders</Text>
            <ChevronRight size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <CreditCard size={20} color="#3b82f6" />
            <Text style={[
              styles.menuItemText,
              colorScheme === 'dark' && styles.darkText
            ]}>Payment Methods</Text>
            <ChevronRight size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MapPin size={20} color="#3b82f6" />
            <Text style={[
              styles.menuItemText,
              colorScheme === 'dark' && styles.darkText
            ]}>Addresses</Text>
            <ChevronRight size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={[
            styles.sectionTitleText,
            colorScheme === 'dark' && styles.darkText
          ]}>Preferences</Text>
        </View>

        <View style={[
          styles.menuCard,
          colorScheme === 'dark' && styles.darkCard
        ]}>
          <View style={styles.menuItem}>
            <Moon size={20} color="#3b82f6" />
            <Text style={[
              styles.menuItemText,
              colorScheme === 'dark' && styles.darkText
            ]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
              thumbColor={isDarkMode ? '#3b82f6' : '#f9fafb'}
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <Bell size={20} color="#3b82f6" />
            <Text style={[
              styles.menuItemText,
              colorScheme === 'dark' && styles.darkText
            ]}>Notifications</Text>
            <ChevronRight size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color="#3b82f6" />
            <Text style={[
              styles.menuItemText,
              colorScheme === 'dark' && styles.darkText
            ]}>Settings</Text>
            <ChevronRight size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.logoutButton,
            colorScheme === 'dark' && styles.darkLogoutButton
          ]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  darkContainer: {
    backgroundColor: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  darkText: {
    color: '#f9fafb',
  },
  darkSubText: {
    color: '#d1d5db',
  },
  editText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  saveText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  defaultAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '500',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 16,
  },
  profileFields: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#4b5563',
    color: '#f9fafb',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
  },
  darkLogoutButton: {
    backgroundColor: '#991b1b',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  registerText: {
    fontSize: 16,
    marginRight: 4,
  },
  registerLink: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
  },
});