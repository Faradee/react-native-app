import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const LoadingOverlay = ({isLoading}) => {
  const LoadingOverlayView = styled.View`
    position: absolute;
    align-items: center;
    background-color: #000000;
    width: 100%;
    height: 100%;
    opacity: ${isLoading ? 0.6 : 0};
    transition: opacity 1;
    flex:1;
    justify-content:center;
    align-items:center;
  `;
  return (
    <LoadingOverlayView pointerEvents={isLoading ? "auto" : "none"}>
      <ActivityIndicator size="large" color="white" />
    </LoadingOverlayView>
  );
};

export default LoadingOverlay;
