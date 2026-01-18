import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { ChildProfile } from '../types/database.types';
import { useAuth } from './AuthContext';

interface ChildContextType {
  activeChild: ChildProfile | null;
  allChildren: ChildProfile[];
  setActiveChild: (child: ChildProfile) => void;
  refreshChildren: () => Promise<void>;
  loading: boolean;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // ✅ Auth state'i dinle
  const [activeChild, setActiveChildState] = useState<ChildProfile | null>(null);
  const [allChildren, setAllChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChildren = useCallback(async () => {
    try {
      // Giriş yapan kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('Kullanıcı girişi yapılmamış');
        setAllChildren([]);
        setActiveChildState(null);
        setLoading(false);
        return;
      }

      // Ebeveyn profilini al veya oluştur
      let { data: parentData } = await supabase
        .from('parent_profiles')
        .select('id')
        .eq('user_id', user.id)
        .is('parent_id', null)
        .maybeSingle();

      // Eğer ebeveyn profili yoksa oluştur
      if (!parentData) {
        const { data: newParent, error: createError } = await supabase
          .from('parent_profiles')
          .insert({
            user_id: user.id,
            nickname: user.email?.split('@')[0] || 'Ebeveyn',
            age: 35,
            is_active: false,
          })
          .select('id')
          .single();

        if (createError) {
          console.error('Ebeveyn profili oluşturulamadı:', createError);
          setAllChildren([]);
          setActiveChildState(null);
          setLoading(false);
          return;
        }

        parentData = newParent;
      }

      // Çocuk profillerini al (parent_id'si olan kayıtlar)
      const { data: childrenData, error } = await supabase
        .from('parent_profiles')
        .select('*')
        .eq('parent_id', parentData.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setAllChildren(childrenData || []);

      // Aktif çocuğu bul
      const active = childrenData?.find(child => child.is_active);
      if (active) {
        setActiveChildState(active);
      } else if (childrenData && childrenData.length > 0) {
        // Aktif çocuk yoksa ilkini aktif yap (infinite loop önlemek için direkt update)
        const firstChild = childrenData[0];

        // Direkt database güncelle (setActiveChild çağırmadan)
        await supabase
          .from('parent_profiles')
          .update({ is_active: true })
          .eq('id', firstChild.id);

        setActiveChildState(firstChild);
      }
    } catch (error) {
      console.error('Çocuklar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ useCallback dependency array

  const setActiveChild = useCallback(async (child: ChildProfile) => {
    try {
      // Giriş yapan kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('Kullanıcı girişi yapılmamış');
        return;
      }

      // Ebeveyn profilini al
      const { data: parentData } = await supabase
        .from('parent_profiles')
        .select('id')
        .eq('user_id', user.id)
        .is('parent_id', null)
        .maybeSingle();

      if (!parentData) {
        console.log('Ebeveyn profili bulunamadı');
        return;
      }

      // Tüm çocuk profillerini pasif yap
      await supabase
        .from('parent_profiles')
        .update({ is_active: false })
        .eq('parent_id', parentData.id);

      // Seçilen çocuğu aktif yap
      const { error } = await supabase
        .from('parent_profiles')
        .update({ is_active: true })
        .eq('id', child.id);

      if (error) throw error;

      setActiveChildState(child);
      await fetchChildren(); // Listeyi yenile
    } catch (error) {
      console.error('Aktif çocuk ayarlanırken hata:', error);
    }
  }, [fetchChildren]); // ✅ fetchChildren dependency

  const refreshChildren = useCallback(async () => {
    setLoading(true);
    await fetchChildren();
  }, [fetchChildren]); // ✅ fetchChildren dependency

  useEffect(() => {
    // ✅ User değiştiğinde (login/logout) çocuk profillerini yeniden yükle
    if (user) {
      fetchChildren();
    } else {
      // Logout durumunda state'i temizle
      setAllChildren([]);
      setActiveChildState(null);
      setLoading(false);
    }
  }, [user, fetchChildren]); // ✅ user ve fetchChildren dependencies

  return (
    <ChildContext.Provider
      value={{
        activeChild,
        allChildren,
        setActiveChild,
        refreshChildren,
        loading,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = () => {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};
