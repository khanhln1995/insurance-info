import AppText from "@/components/AppText";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Types
export type EmploymentRow = {
  id: string | number;
  tuthang: string; // e.g. "07/2024"
  denthang: string; // e.g. "09/2025"
  donvi: string; // long names wrap
  chucvu: string; // e.g. "Nhân viên"
  // you can add more fields and map them in columns if needed
};

export type Column<T> = {
  key: keyof T;
  label: string;
  flex?: number; // column width ratio
  align?: "left" | "center" | "right";
  numberOfLines?: number; // default 2 for body cells
  headerLines?: number; // default 2 for header
};

type Props = {
  data: EmploymentRow[];
  onPressView?: (row: EmploymentRow) => void;
  // if you don't use icons, omit actionIcon and it will render text "👁"
  actionIcon?: any; // require(".../eye.png")
  headerColor?: string; // default matches screenshot
  containerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  cellTextStyle?: TextStyle;
  // Optional: supply your own columns (default provided below)
  columns?: Column<EmploymentRow>[];
  isBHYT?: boolean;
  title?: string;
};

const defaultColumns: Column<EmploymentRow>[] = [
  {
    key: "tuthang",
    label: "Từ tháng",
    flex: 1,
    align: "center",
    headerLines: 1,
  },
  {
    key: "denthang",
    label: "Đến \n tháng",
    flex: 1,
    align: "center",
    headerLines: 1,
  },
  {
    key: "donvi",
    label: "Đơn vị",
    flex: 2.4,
    align: "center",
    headerLines: 2,
    numberOfLines: 3,
  },
  {
    key: "chucvu",
    label: "Nghề nghiệp\nChức vụ",
    flex: 1.4,
    align: "center",
    headerLines: 2,
  },
];

const EmploymentHistoryTable: React.FC<Props> = ({
  data,
  onPressView,
  actionIcon,
  headerColor = "#345E94", // blue like screenshot DCE7FA
  
  containerStyle,
  headerTextStyle,
  cellTextStyle,
  columns = defaultColumns,
  isBHYT = false,
  title,
}) => {
  const displayColumns = React.useMemo(
    () => (isBHYT ? columns.filter((c) => c.key !== "chucvu") : columns),
    [isBHYT, columns]
  );
  const renderHeader = () => (
    <View style={[styles.row, { backgroundColor: headerColor }]}>
      {displayColumns.map((col, idx) => (
        <View
          key={`h-${String(col.key)}`}
          style={[
            {
              flex: col.flex ?? 1,
              paddingHorizontal: 8,
              paddingVertical: 8.48,
              justifyContent: "center",
            },
            idx !== 0 && isBHYT && styles.borderLeftWhite,
          ]}
        >
          <AppText
            variant="micro"
            numberOfLines={2}
            style={[styles.headerText, headerTextStyle]}
            ellipsizeMode="tail"
          >
            {col.label}
          </AppText>
        </View>
      ))}
      {/* Action column */}
      <View
        style={[
          {
            paddingHorizontal: 4,
            paddingVertical: 8.48,
            justifyContent: "center",
            width: 32,
            flexGrow: 0,
          },
          isBHYT && styles.borderLeftWhite,
        ]}
      />
    </View>
  );

  const renderItem = ({ item }: { item: EmploymentRow }) => (
    <View style={[styles.row, { backgroundColor: "white" }]}>
      {displayColumns.map((col, idx) => {
        const value = String(item[col.key] ?? "");
        const isLast = idx === displayColumns.length - 1;
        const alignStyle: TextStyle =
          col.align === "right"
            ? { textAlign: "right" }
            : col.align === "left"
              ? { textAlign: "left" }
              : { textAlign: "center" };

        return (
          <View
            key={`c-${item.id}-${String(col.key)}`}
            style={[
              {
                flex: col.flex ?? 1,
                paddingHorizontal: 8,
                paddingVertical: 8.48,
                justifyContent: "center",
                borderTopWidth: 0.9,
                borderTopColor: isBHYT ? "#bfdcfc" : "#6E95C2",
              },
              idx !== 0 && {
                borderLeftWidth: 0.9,
                borderLeftColor: isBHYT ? "#bfdcfc" : "#6E95C2",
              },
            ]}
          >
            <AppText
              variant="micro"
              style={[styles.cellText, alignStyle, cellTextStyle]}
            >
              {value}
            </AppText>
          </View>
        );
      })}

      {/* Action cell */}
      <View
        style={[
          {
            // paddingHorizontal: 4,
            paddingVertical: 8.48,
            justifyContent: "center",
            width: 32,
            borderLeftWidth: 0.9,
            borderLeftColor: isBHYT ? "#bfdcfc" : "#6E95C2",
            flexGrow: 0,
            borderTopColor: isBHYT ? "#bfdcfc" : "#6E95C2",
            borderTopWidth: 0.9,
          },
        ]}
      >
        {onPressView ? (
          <TouchableOpacity
            onPress={() => onPressView(item)}
            style={styles.eyeButton}
          >
            {actionIcon ? (
              <Image
                source={actionIcon}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            ) : (
              <FontAwesome name="eye" size={21.1} color={headerColor} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, containerStyle, {
      borderColor: isBHYT ? "#bfdcfc" : "#6E95C2",
    }]}>
      {renderHeader()}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={{
          // height: 0.9,
          // backgroundColor: isBHYT ? "#bfdcfc" : "#6E95C2",
        }} />}
        scrollEnabled={false}
      />
    </View>
  );
};

export default EmploymentHistoryTable;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.9,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  cell: {
    paddingHorizontal: 4,
    paddingVertical: 8.48,
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    textAlign: "center",
  },
  cellText: {
    color: "#2E2F33",
  },
  separator: {
    height: 0.9,
    backgroundColor: "#E6F1FA",
  },
  borderLeftWhite: {
    borderLeftWidth: 0.9,
    borderLeftColor: "#bfdcfc",
  },
  borderLeftGrey: {
    borderLeftWidth: 0.9,
    borderLeftColor: "#E6F1FA",
  },
  eyeButton: { flex: 1, alignItems: "center", justifyContent: "center" },
});
