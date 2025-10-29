import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ label, value, onChange, style, maximumDate, minimumDate }) => {
  const [show, setShow] = useState(false);
  // Default to today's date for date of birth (can't be in the future)
  const defaultMaxDate = maximumDate || new Date();
  const [internalDate, setInternalDate] = useState(value ? new Date(value) : new Date());

  // Update internal date when value prop changes
  React.useEffect(() => {
    if (value) {
      setInternalDate(new Date(value));
    }
  }, [value]);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const formatDate = (date) => {
    if (!date) return 'Seleccionar fecha';
    const d = new Date(date);
    return `${d.getDate()} de ${months[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
      if (event.type === 'set' && selectedDate) {
        setInternalDate(selectedDate);
        onChange(selectedDate);
      }
    } else {
      // iOS: Update date as user scrolls
      if (selectedDate) {
        setInternalDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    setShow(false);
    onChange(internalDate);
  };

  const handleCancel = () => {
    setShow(false);
    // Reset to original value
    if (value) {
      setInternalDate(new Date(value));
    }
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View className="mb-4" style={style}>
      {label && (
        <Text
          className="text-base font-semibold text-gray-900 mb-2"
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#111827',
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        className="flex-row justify-between items-center border border-gray-300 rounded-lg px-4 py-2 bg-white"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: '#ffffff',
        }}
        onPress={showPicker}
        activeOpacity={0.8}
      >
        <Text
          className={`text-base flex-1 ${!value ? 'text-gray-500' : 'text-gray-900'}`}
          style={{
            fontSize: 16,
            flex: 1,
            color: !value ? '#6b7280' : '#111827',
          }}
        >
          {formatDate(value || internalDate)}
        </Text>
        <Text
          className="text-xl ml-2"
          style={{
            fontSize: 20,
            marginLeft: 8,
          }}
        >
          📅
        </Text>
      </TouchableOpacity>

      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={internalDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={defaultMaxDate}
          minimumDate={minimumDate}
          locale="es_ES"
        />
      )}

      {show && Platform.OS === 'ios' && (
        <Modal
          visible={show}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: 34,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#e5e7eb',
                }}
              >
                <TouchableOpacity onPress={handleCancel}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#6b7280',
                      fontWeight: '500',
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#111827',
                  }}
                >
                  {label || 'Seleccionar fecha'}
                </Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#3b82f6',
                      fontWeight: '600',
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={internalDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={defaultMaxDate}
                minimumDate={minimumDate}
                locale="es_ES"
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DatePicker;

