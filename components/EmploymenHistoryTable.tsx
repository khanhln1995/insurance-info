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
  fromMonth: string; // e.g. "07/2024"
  toMonth: string; // e.g. "09/2025"
  company: string; // long names wrap
  position: string; // e.g. "Nhân viên"
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
};

const defaultColumns: Column<EmploymentRow>[] = [
  {
    key: "fromMonth",
    label: "Từ tháng",
    flex: 1,
    align: "center",
    headerLines: 1,
  },
  {
    key: "toMonth",
    label: "Đến tháng",
    flex: 1,
    align: "center",
    headerLines: 1,
  },
  {
    key: "company",
    label: "Đơn vị",
    flex: 2.4,
    align: "center",
    headerLines: 2,
    numberOfLines: 3,
  },
  {
    key: "position",
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
}) => {
  const renderHeader = () => (
    <View style={[styles.row, { backgroundColor: headerColor }]}>
      {columns.map((col, idx) => (
        <View
          key={`h-${String(col.key)}`}
          style={[
            styles.cell,
            { flex: col.flex ?? 1 },
            idx !== 0 && styles.borderLeftWhite,
          ]}
        >
          <Text style={[styles.headerText, headerTextStyle]}>{col.label}</Text>
        </View>
      ))}
      {/* Action column */}
      <View
        style={[
          styles.cell,
          styles.borderLeftWhite,
          { width: 44, flexGrow: 0 },
        ]}
      >
        {/* empty header cell (just keep blue bg) */}
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: EmploymentRow }) => (
    <View style={[styles.row, { backgroundColor: "white" }]}>
      {columns.map((col, idx) => {
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
            <Text
              style={[styles.cellText, alignStyle, cellTextStyle]}
              //   numberOfLines={col.numberOfLines ?? 2}
              //   ellipsizeMode="tail"
            >
              {value}
            </Text>
          </View>
        );
      })}

      {/* Action cell (eye) */}
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
              <Text style={{ fontSize: 16 }}>👁</Text>
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
        keyExtractor={(it) => String(it.id)}
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
    fontSize: 12,
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
