import "react-native-get-random-values";
import "intl-pluralrules";
import "expo-dev-client";
import "../i18n";
import { RealmProvider, useRealm } from "@realm/react";
import { Stack } from "expo-router";
import {
  Button,
  Icon,
  IconButton,
  MD3Colors,
  Menu,
  PaperProvider,
  Text,
} from "react-native-paper";
import { theme } from "../theme";
import { Examination } from "../models/examination.model";
import { AppLanguage } from "../models/app-language";
import { Patient, PatientImage } from "../models/patient.model";
import LanguageListener from "../components/LanguageListener";
import { StyleSheet, TouchableOpacity, View } from "react-native";
// import { useNetInfo } from '@react-native-community/netinfo';
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useLanguageService } from "../services/language.service";
import {
  ESupportedLanguages,
  languagesDisplayNames,
} from "../languages/language.enums";
import * as ScreenOrientation from "expo-screen-orientation";
import { Sync } from "../models/sync.model";
import { SyncService } from "../services/sync.service";
import { useServerStatus } from "../utils/useServerStatus";

/**************************************
 ******** _Layout Component ************
 *************************************/
const _Layout = () => {
  // Add global providers here
  return (
    <>
      <RealmProvider
        schema={[PatientImage, Patient, Examination, AppLanguage, Sync]}
        schemaVersion={30}
      >
        <PaperProvider theme={theme}>
          <RenderAppLayout />
        </PaperProvider>
      </RealmProvider>
    </>
  );
};

export default _Layout;

/**************************************
 ******** RenderAppLayout Component ****
 *************************************/
const RenderAppLayout = () => {
  const { isOnline } = useServerStatus();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setAppLanguage } = useLanguageService();
  const realm = useRealm();
  const { syncAppToServer, syncServerToTablet } = new SyncService(realm);

  // Handle language change
  const handleLanguageChange = (language: ESupportedLanguages) => {
    // Set i18next language
    i18n.changeLanguage(language);
    // Set language in db
    setAppLanguage(language);
    // Close the menu
    setIsMenuOpen(false);
  };

  // Support all orientations
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  // Render the app layout
  return (
    <>
      {/* Listens to language changes and switchs app layout accordingly */}
      <LanguageListener />

      <Stack
        screenOptions={{
          headerRight: () => (
            <>
              <Button
                icon={({ size, color }) => (
                  <IconButton icon="sync" size={size} iconColor={color} />
                )}
                mode="outlined"
                compact
                style={styles.syncButton}
                onPress={syncAppToServer}
                disabled={!isOnline}
              >
                Sync
              </Button>

              <Button
                icon={({ size, color }) => (
                  <IconButton
                    icon="cloud-download"
                    size={size}
                    iconColor={color}
                  />
                )}
                mode="outlined"
                compact
                style={styles.syncButton}
                onPress={syncServerToTablet}
                disabled={!isOnline}
              >
                Get Latest Data
              </Button>

              {/* Language selection menu */}
              <Menu
                visible={isMenuOpen}
                onDismiss={() => setIsMenuOpen(false)}
                anchor={
                  <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
                    <Text style={styles.languageText}>
                      {
                        languagesDisplayNames[
                          i18n.language as ESupportedLanguages
                        ]
                      }
                      <Icon source="web" size={18} />
                    </Text>
                  </TouchableOpacity>
                }
              >
                {Object.values(ESupportedLanguages).map((language) => (
                  <Menu.Item
                    key={language}
                    title={languagesDisplayNames[language]}
                    onPress={() => handleLanguageChange(language)}
                  />
                ))}
              </Menu>

              {/* Internet status indicator */}
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: isOnline ? "green" : "gray",
                  },
                ]}
              />
              <Text style={[isOnline ? styles.onlineText : styles.offlineText]}>
                {isOnline
                  ? t("networkStatus.online")
                  : t("networkStatus.offline")}
              </Text>
            </>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "Afiyet" }} />
        <Stack.Screen
          name="patients/new"
          options={{ title: "Add New Patient" }}
        />
        <Stack.Screen
          name="patients/[patientId]/update"
          options={{ title: "Update Patient Profile" }}
        />
        <Stack.Screen
          name="patients/[patientId]/visits/index"
          options={{ title: "Patient Visits List" }}
        />
        <Stack.Screen
          name="patients/[patientId]/visits/new"
          options={{ title: "Add New Patient Visit" }}
        />
        <Stack.Screen
          name="patients/[patientId]/visits/[visitId]/index"
          options={{ title: "Patient Visit Info" }}
        />
        <Stack.Screen
          name="patients/[patientId]/visits/[visitId]/test/new"
          options={{ title: "Lab Tests" }}
        />
      </Stack>
    </>
  );
};

/**************************************
 ******** Stylesheet Stylings *********
 *************************************/
const styles = StyleSheet.create({
  header: {
    paddingEnd: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  onlineText: {
    color: "black",
  },
  offlineText: {
    color: "gray",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "bold",
    marginEnd: 15,
  },
  syncButton: {
    marginEnd: 20,
    borderColor: MD3Colors.primary100,
  },
});
