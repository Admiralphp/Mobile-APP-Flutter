import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ChevronLeft, CreditCard, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useCart } from '@/hooks/useCart';

export default function CheckoutScreen() {
  const colorScheme = useColorScheme();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const validateShippingInfo = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!shippingInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else {
      newErrors.firstName = '';
    }
    
    if (!shippingInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    } else {
      newErrors.lastName = '';
    }
    
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    } else {
      newErrors.address = '';
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const validatePaymentInfo = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!paymentInfo.cardNumber.trim() || paymentInfo.cardNumber.length < 16) {
      newErrors.cardNumber = 'Valid card number is required';
      isValid = false;
    } else {
      newErrors.cardNumber = '';
    }
    
    if (!paymentInfo.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
      isValid = false;
    } else {
      newErrors.cardholderName = '';
    }
    
    if (!paymentInfo.expiryDate.trim() || !paymentInfo.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Valid expiry date (MM/YY) is required';
      isValid = false;
    } else {
      newErrors.expiryDate = '';
    }
    
    if (!paymentInfo.cvv.trim() || paymentInfo.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV is required';
      isValid = false;
    } else {
      newErrors.cvv = '';
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (step === 1) {
      if (validateShippingInfo()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePaymentInfo()) {
        setStep(3);
      }
    } else if (step === 3) {
      setIsProcessing(true);
      
      // Simulate order processing
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        setStep(4);
      }, 2000);
    } else if (step === 4) {
      router.push('/');
    }
  };

  const formatCardNumber = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.slice(i, i + 4) + ' ';
    }
    return formatted.trim();
  };

  const formatExpiryDate = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    if (digits.length > 0) {
      // Format as MM/YY
      if (digits.length <= 2) {
        return digits;
      } else {
        return digits.slice(0, 2) + '/' + digits.slice(2, 4);
      }
    }
    return '';
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: 'Checkout',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
          },
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#f9fafb' : '#1f2937',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              if (step > 1 && step < 4) {
                setStep(step - 1);
              } else {
                router.back();
              }
            }}>
              <ChevronLeft 
                size={24} 
                color={colorScheme === 'dark' ? '#f9fafb' : '#1f2937'} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[
        styles.container, 
        colorScheme === 'dark' && styles.darkContainer
      ]} edges={['bottom']}>
        <View style={styles.progressContainer}>
          <View style={[
            styles.progressBar,
            colorScheme === 'dark' && styles.darkProgressBar
          ]}>
            <View 
              style={[
                styles.progressFill,
                { width: `${((step - 1) / 3) * 100}%` }
              ]} 
            />
          </View>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                step >= 1 && styles.activeStepCircle
              ]}>
                <Text style={[
                  styles.stepNumber,
                  step >= 1 && styles.activeStepNumber
                ]}>1</Text>
              </View>
              <Text style={[
                styles.stepLabel,
                colorScheme === 'dark' && styles.darkText
              ]}>Shipping</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                step >= 2 && styles.activeStepCircle
              ]}>
                <Text style={[
                  styles.stepNumber,
                  step >= 2 && styles.activeStepNumber
                ]}>2</Text>
              </View>
              <Text style={[
                styles.stepLabel,
                colorScheme === 'dark' && styles.darkText
              ]}>Payment</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                step >= 3 && styles.activeStepCircle
              ]}>
                <Text style={[
                  styles.stepNumber,
                  step >= 3 && styles.activeStepNumber
                ]}>3</Text>
              </View>
              <Text style={[
                styles.stepLabel,
                colorScheme === 'dark' && styles.darkText
              ]}>Review</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {step === 1 && (
            <View style={styles.formContainer}>
              <Text style={[
                styles.formTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>Shipping Information</Text>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>First Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput,
                      errors.firstName && styles.inputError
                    ]}
                    value={shippingInfo.firstName}
                    onChangeText={(text) => setShippingInfo({...shippingInfo, firstName: text})}
                    placeholder="John"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  />
                  {errors.firstName ? (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  ) : null}
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>Last Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput,
                      errors.lastName && styles.inputError
                    ]}
                    value={shippingInfo.lastName}
                    onChangeText={(text) => setShippingInfo({...shippingInfo, lastName: text})}
                    placeholder="Doe"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  />
                  {errors.lastName ? (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  ) : null}
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  colorScheme === 'dark' && styles.darkText
                ]}>Address</Text>
                <TextInput
                  style={[
                    styles.input,
                    colorScheme === 'dark' && styles.darkInput,
                    errors.address && styles.inputError
                  ]}
                  value={shippingInfo.address}
                  onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
                  placeholder="123 Main St"
                  placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                />
                {errors.address ? (
                  <Text style={styles.errorText}>{errors.address}</Text>
                ) : null}
              </View>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>City</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput
                    ]}
                    value={shippingInfo.city}
                    onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
                    placeholder="New York"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>State</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput
                    ]}
                    value={shippingInfo.state}
                    onChangeText={(text) => setShippingInfo({...shippingInfo, state: text})}
                    placeholder="NY"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>ZIP</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput
                    ]}
                    value={shippingInfo.zipCode}
                    onChangeText={(text) => setShippingInfo({...shippingInfo, zipCode: text})}
                    placeholder="10001"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel,
                  colorScheme === 'dark' && styles.darkText
                ]}>Phone Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    colorScheme === 'dark' && styles.darkInput
                  ]}
                  value={shippingInfo.phone}
                  onChangeText={(text) => setShippingInfo({...shippingInfo, phone: text})}
                  placeholder="(123) 456-7890"
                  placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}
          
          {step === 2 && (
            <View style={styles.formContainer}>
              <Text style={[
                styles.formTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>Payment Information</Text>
              
              <View style={styles.creditCardContainer}>
                <CreditCard size={24} color="#3b82f6" style={styles.cardIcon} />
                
                <View style={styles.inputGroup}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>Card Number</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput,
                      errors.cardNumber && styles.inputError
                    ]}
                    value={paymentInfo.cardNumber}
                    onChangeText={(text) => {
                      const formatted = formatCardNumber(text);
                      setPaymentInfo({...paymentInfo, cardNumber: formatted});
                    }}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                    keyboardType="number-pad"
                    maxLength={19} // 16 digits + 3 spaces
                  />
                  {errors.cardNumber ? (
                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                  ) : null}
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={[
                    styles.inputLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>Cardholder Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      colorScheme === 'dark' && styles.darkInput,
                      errors.cardholderName && styles.inputError
                    ]}
                    value={paymentInfo.cardholderName}
                    onChangeText={(text) => setPaymentInfo({...paymentInfo, cardholderName: text})}
                    placeholder="John Doe"
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  />
                  {errors.cardholderName ? (
                    <Text style={styles.errorText}>{errors.cardholderName}</Text>
                  ) : null}
                </View>
                
                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={[
                      styles.inputLabel,
                      colorScheme === 'dark' && styles.darkText
                    ]}>Expiry Date</Text>
                    <TextInput
                      style={[
                        styles.input,
                        colorScheme === 'dark' && styles.darkInput,
                        errors.expiryDate && styles.inputError
                      ]}
                      value={paymentInfo.expiryDate}
                      onChangeText={(text) => {
                        const formatted = formatExpiryDate(text);
                        setPaymentInfo({...paymentInfo, expiryDate: formatted});
                      }}
                      placeholder="MM/YY"
                      placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                      keyboardType="number-pad"
                      maxLength={5} // MM/YY
                    />
                    {errors.expiryDate ? (
                      <Text style={styles.errorText}>{errors.expiryDate}</Text>
                    ) : null}
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={[
                      styles.inputLabel,
                      colorScheme === 'dark' && styles.darkText
                    ]}>CVV</Text>
                    <TextInput
                      style={[
                        styles.input,
                        colorScheme === 'dark' && styles.darkInput,
                        errors.cvv && styles.inputError
                      ]}
                      value={paymentInfo.cvv}
                      onChangeText={(text) => setPaymentInfo({...paymentInfo, cvv: text.replace(/\D/g, '')})}
                      placeholder="123"
                      placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                      keyboardType="number-pad"
                      maxLength={4}
                      secureTextEntry
                    />
                    {errors.cvv ? (
                      <Text style={styles.errorText}>{errors.cvv}</Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          )}
          
          {step === 3 && (
            <View style={styles.reviewContainer}>
              <Text style={[
                styles.formTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>Order Review</Text>
              
              <View style={[
                styles.sectionCard,
                colorScheme === 'dark' && styles.darkCard
              ]}>
                <Text style={[
                  styles.sectionTitle,
                  colorScheme === 'dark' && styles.darkText
                ]}>Shipping Details</Text>
                
                <View style={styles.infoRow}>
                  <Text style={[
                    styles.infoLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>Name:</Text>
                  <Text style={[
                    styles.infoValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>{shippingInfo.firstName} {shippingInfo.lastName}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={[
                    styles.infoLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>Address:</Text>
                  <Text style={[
                    styles.infoValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>{shippingInfo.address}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={[
                    styles.infoLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>City:</Text>
                  <Text style={[
                    styles.infoValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={[
                    styles.infoLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>Phone:</Text>
                  <Text style={[
                    styles.infoValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>{shippingInfo.phone}</Text>
                </View>
              </View>
              
              <View style={[
                styles.sectionCard,
                colorScheme === 'dark' && styles.darkCard
              ]}>
                <Text style={[
                  styles.sectionTitle,
                  colorScheme === 'dark' && styles.darkText
                ]}>Payment Method</Text>
                
                <View style={styles.paymentMethod}>
                  <CreditCard size={20} color="#3b82f6" style={styles.paymentIcon} />
                  <View style={styles.paymentDetails}>
                    <Text style={[
                      styles.cardName,
                      colorScheme === 'dark' && styles.darkText
                    ]}>Credit Card</Text>
                    <Text style={[
                      styles.cardNumber,
                      colorScheme === 'dark' && styles.darkSubtext
                    ]}>**** **** **** {paymentInfo.cardNumber.slice(-4)}</Text>
                  </View>
                </View>
              </View>
              
              <View style={[
                styles.sectionCard,
                colorScheme === 'dark' && styles.darkCard
              ]}>
                <Text style={[
                  styles.sectionTitle,
                  colorScheme === 'dark' && styles.darkText
                ]}>Order Summary</Text>
                
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <Text style={[
                      styles.itemQuantity,
                      colorScheme === 'dark' && styles.darkSubtext
                    ]}>{item.quantity}x</Text>
                    <Text style={[
                      styles.itemName,
                      colorScheme === 'dark' && styles.darkText
                    ]}>{item.name}</Text>
                    <Text style={[
                      styles.itemPrice,
                      colorScheme === 'dark' && styles.darkText
                    ]}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
                
                <View style={styles.divider} />
                
                <View style={styles.subtotalRow}>
                  <Text style={[
                    styles.subtotalLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>Subtotal</Text>
                  <Text style={[
                    styles.subtotalValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>${cartTotal.toFixed(2)}</Text>
                </View>
                
                <View style={styles.subtotalRow}>
                  <Text style={[
                    styles.subtotalLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>Shipping</Text>
                  <Text style={[
                    styles.subtotalValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>Free</Text>
                </View>
                
                <View style={styles.subtotalRow}>
                  <Text style={[
                    styles.subtotalLabel,
                    colorScheme === 'dark' && styles.darkSubtext
                  ]}>Tax</Text>
                  <Text style={[
                    styles.subtotalValue,
                    colorScheme === 'dark' && styles.darkText
                  ]}>${(cartTotal * 0.08).toFixed(2)}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.totalRow}>
                  <Text style={[
                    styles.totalLabel,
                    colorScheme === 'dark' && styles.darkText
                  ]}>Total</Text>
                  <Text style={styles.totalValue}>${(cartTotal + (cartTotal * 0.08)).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )}
          
          {step === 4 && (
            <View style={styles.confirmationContainer}>
              <CheckCircle size={80} color="#10b981" />
              
              <Text style={[
                styles.confirmationTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>Order Confirmed!</Text>
              
              <Text style={[
                styles.confirmationMessage,
                colorScheme === 'dark' && styles.darkSubtext
              ]}>
                Thank you for your purchase. We've received your order and will begin processing it right away.
              </Text>
              
              <View style={[
                styles.orderNumberCard,
                colorScheme === 'dark' && styles.darkCard
              ]}>
                <Text style={[
                  styles.orderNumberLabel,
                  colorScheme === 'dark' && styles.darkSubtext
                ]}>Order Number</Text>
                <Text style={[
                  styles.orderNumber,
                  colorScheme === 'dark' && styles.darkText
                ]}>#ORD-{Math.floor(100000 + Math.random() * 900000)}</Text>
              </View>
              
              <Text style={[
                styles.estimatedDelivery,
                colorScheme === 'dark' && styles.darkSubtext
              ]}>
                Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </Text>
              
              <Text style={[
                styles.confirmationNote,
                colorScheme === 'dark' && styles.darkSubtext
              ]}>
                You will receive an email confirmation shortly.
              </Text>
            </View>
          )}
        </ScrollView>
        
        {step < 4 && (
          <View style={[
            styles.summaryContainer,
            colorScheme === 'dark' && styles.darkSummaryContainer
          ]}>
            <View style={styles.summaryRow}>
              <Text style={[
                styles.summaryLabel,
                colorScheme === 'dark' && styles.darkText
              ]}>Total:</Text>
              <Text style={[
                styles.summaryValue,
                colorScheme === 'dark' && styles.darkText
              ]}>${(cartTotal + (step === 3 ? cartTotal * 0.08 : 0)).toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleContinue}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.continueButtonText}>
                  {step === 3 ? 'Place Order' : 'Continue'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        
        {step === 4 && (
          <View style={[
            styles.summaryContainer,
            colorScheme === 'dark' && styles.darkSummaryContainer
          ]}>
            <TouchableOpacity 
              style={styles.continueShoppingButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
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
  progressContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  darkProgressBar: {
    backgroundColor: '#374151',
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeStepCircle: {
    backgroundColor: '#3b82f6',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeStepNumber: {
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 12,
  },
  darkText: {
    color: '#f9fafb',
  },
  darkSubtext: {
    color: '#d1d5db',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#374151',
    color: '#f9fafb',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  creditCardContainer: {
    marginTop: 8,
  },
  cardIcon: {
    marginBottom: 16,
  },
  reviewContainer: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6b7280',
    width: 30,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subtotalLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  subtotalValue: {
    fontSize: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  confirmationContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  confirmationMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  orderNumberCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderNumberLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  confirmationNote: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  darkSummaryContainer: {
    backgroundColor: '#374151',
    borderTopColor: '#4b5563',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueShoppingButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueShoppingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});