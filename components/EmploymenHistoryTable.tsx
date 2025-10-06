import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
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
    label: "Đến tháng",
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
  headerColor = "#2F6EA6", // blue like screenshot
  containerStyle,
  headerTextStyle,
  cellTextStyle,
  columns = defaultColumns,
  isBHYT = false,
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
            styles.cell,
            { flex: col.flex ?? 1 },
            idx !== 0 && styles.borderLeftWhite,
          ]}
        >
          <Text
            numberOfLines={2}
            style={[styles.headerText, headerTextStyle]}
            ellipsizeMode="tail"
          >
            {col.label}
          </Text>
        </View>
      ))}
      {/* Action column */}
      <View
        style={[
          styles.cell,
          styles.borderLeftWhite,
          { width: 44, flexGrow: 0 },
        ]}
      />
    </View>
  );

  const renderItem = ({ item }: { item: EmploymentRow }) => (
    <View style={[styles.row, { backgroundColor: "white" }]}>
      {displayColumns.map((col, idx) => {
        const value = String(item[col.key] ?? "");
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
              styles.cell,
              { flex: col.flex ?? 1 },
              idx !== 0 && styles.borderLeftGrey,
            ]}
          >
            <Text style={[styles.cellText, alignStyle, cellTextStyle]}>
              {value}
            </Text>
          </View>
        );
      })}

      {/* Action cell */}
      <View
        style={[styles.cell, styles.borderLeftGrey, { width: 44, flexGrow: 0 }]}
      >
        {onPressView ? (
          <TouchableOpacity
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
              <Image
                source={require("@/assets/images/icon/eye.png")}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {renderHeader()}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
      />
    </View>
  );
};

export default EmploymentHistoryTable;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#DCE0E5",
    borderRadius: 4,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
  },
  cellText: {
    color: "#2E2F33",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#DCE0E5",
  },
  borderLeftWhite: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.8)",
  },
  borderLeftGrey: {
    borderLeftWidth: 1,
    borderLeftColor: "#DCE0E5",
  },
  eyeButton: { alignItems: "center", justifyContent: "center" },
});
